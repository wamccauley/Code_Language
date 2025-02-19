import os
import json

root_dir = "./"
pages = []

for root, _, files in os.walk(root_dir):
    for file in files:
        if file.endswith(".md"):
            relative_path = os.path.relpath(os.path.join(root, file), root_dir)
            pages.append(relative_path.replace("\\", "/"))

with open(os.path.join(root_dir, "pages.json"), "w") as f:
    json.dump({"pages": pages}, f, indent=2)

print("pages.json updated!")
