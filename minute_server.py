# -*- coding: utf-8 -*-
"""
Created on Thu Feb  7 17:26:17 2019

@author: AY
"""
import mysql.connector
import random
import time
from mysql.connector import Error


keys_List =["fuel",
  "speed",
  "distance",
  "becon",
  "door_lock_status",
  "env_temp",  
  "fuel_flow_rate",
  "engine_temp",
  "tyre_pressure",
  "battery_status",
  "vehicle_name",
  "brake_cond",
  "veh_type",
  "veh_weight",
  "mobilise_status",
  "crank_status", 
  "breakdown_stat",
  "airbag_stat"
]
 
def connect():
    """ Connect to MySQL database """
    try:
        conn = mysql.connector.connect(host='localhost',
                                       database='',
                                       user='root',
                                       password='',
                                       auth_plugin='mysql_native_password')
        if conn.is_connected():
            print('Connected to MySQL database')        
        
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM store")
        row = cursor.fetchone()
        
        while row is not None:
            print(row)
            row = cursor.fetchone()
        new_value=str(random.randrange(999999))
        key_value=random.randrange(18)
        new_key=keys_List[key_value]
        print(new_key,new_value)
        
        
        sql = "UPDATE store SET value = "+new_value+" WHERE key_value = '"+new_key+"'"
        cursor.execute(sql)
        conn.commit()
        print(cursor.rowcount, "record(s) affected")
        
            
    except Error as e:
        print(e)
 
    finally:
        conn.close()
 
 
if __name__ == '__main__':
    while True:
        connect()
        time.sleep(1)
        
    
    
