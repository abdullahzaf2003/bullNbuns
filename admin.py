import pymongo
import time
from datetime import datetime
import os

# Configuration
MONGO_URI = "mongodb+srv://abdullah:9112@cluster0.luhfx1y.mongodb.net/bullnbuns?retryWrites=true&w=majority"
DB_NAME = "bullnbuns"
COLLECTION_NAME = "orders"

def connect_db():
    try:
        client = pymongo.MongoClient(MONGO_URI)
        db = client[DB_NAME]
        return db[COLLECTION_NAME]
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def format_date(date_obj):
    if isinstance(date_obj, datetime):
        return date_obj.strftime("%Y-%m-%d %H:%M:%S")
    return str(date_obj)

def main():
    collection = connect_db()
    if collection is None:
        return

    while True:
        clear_screen()
        print("=========================================")
        print("       BULL N BUNS - ADMIN PANEL         ")
        print("=========================================")
        
        # Fetch active orders (not finalized ones to keep list clean, or show last 10)
        # Showing all non-rejected/delivered for action, plus recent active
        orders = list(collection.find({"status": {"$ne": "archived"}}).sort("createdAt", -1).limit(10))
        
        print(f"{'IDX':<5} | {'CUSTOMER':<15} | {'STATUS':<12} | {'TOTAL':<10} | {'ITEMS'}")
        print("-" * 75)

        valid_indices = {}
        
        for idx, order in enumerate(orders):
            valid_indices[idx + 1] = order['_id']
            status = order.get('status', 'pending')
            total = order.get('totalPrice', 0)
            name = order.get('customerName', 'Unknown')
            items_count = len(order.get('items', []))
            
            # Color active?
            print(f"{idx + 1:<5} | {name:<15} | {status:<12} | Rs.{total:<7} | {items_count} items")

        print("\nCommands:")
        print(" r - Refresh")
        print(" # <status> - Set status for Index # (e.g., '1 accepted', '2 delivered', '1 rejected')")
        print(" q - Quit")
        
        cmd = input("\nAdmin > ").strip().lower()

        if cmd == 'q':
            break
        elif cmd == 'r':
            continue
        else:
            try:
                parts = cmd.split()
                if len(parts) == 2:
                    index = int(parts[0])
                    new_status = parts[1]
                    
                    if index in valid_indices:
                        oid = valid_indices[index]
                        
                        if new_status in ['pending', 'accepted', 'rejected', 'delivered']:
                            collection.update_one({"_id": oid}, {"$set": {"status": new_status}})
                            print(f"Update Order #{index} to {new_status}...")
                            time.sleep(1)
                        else:
                            print("Invalid status! Use: pending, accepted, rejected, delivered")
                            time.sleep(2)
                    else:
                        print("Invalid Index!")
                        time.sleep(1)
            except Exception as e:
                print(f"Error parsing command: {e}")
                time.sleep(1)

if __name__ == "__main__":
    main()
