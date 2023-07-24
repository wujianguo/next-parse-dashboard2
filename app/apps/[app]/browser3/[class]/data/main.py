#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json, requests

def main():
    with open('tasks.json') as f:
        data = json.load(f)
        for task in data:
            payload = {
                'title': task['title'],
                'label': task['label'],
                'status': task['status'],
                'priority': task['priority']
            }
            url = 'http://localhost:1337/parse/classes/Task'
            headers = {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': 'applicationidx',
                # 'X-Parse-REST-API-Key': ''
            }
            # payload = {'title': 'hello', 'content': 'content222' }
            r = requests.post(url, headers=headers, json=payload)
            print(r.json())
            # break

if __name__ == '__main__':
    main()
