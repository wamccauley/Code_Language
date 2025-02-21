import os
import json
import glob
import markdown  # pip install markdown
import lunr  # pip install lunr

root_dir = "./"
pages = []
documents = []  # List to store content for the search index

for root, _, files in os.walk(root_dir):
    for file in files:
        if file.endswith(".md"):
            relative_path = os.path.relpath(os.path.join(root, file), root_dir)
            url = relative_path.replace("\\", "/").replace(".md", ".html")  # Correct URL
            pages.append(url)

            # Read the markdown content and convert to HTML (for indexing)
            try:
                with open(os.path.join(root, file), "r", encoding="utf-8") as md_file:
                    markdown_content = md_file.read()
                    html_content = markdown.markdown(markdown_content)  # Convert MD to HTML
            except Exception as e:
                print(f"Error reading or converting {file}: {e}")
                continue  # Skip to the next file

            # Create a document for the search index
            documents.append({
                "url": root.replace(root_dir, "") + "/" + url,  # Store URL for linking
                "title": os.path.splitext(file)[0],  # Use filename (without extension) as title
                "body": html_content,  # Store the HTML content for searching
            })


# Create the pages.json file
with open(os.path.join(root_dir, "pages.json"), "w", encoding="utf-8") as f:
    json.dump({"pages": pages}, f, indent=2)
print("pages.json updated!")


# Build Lunr.js index and save to search_index.json
def build_lunr_index(documents):
    idx = lunr.lunr(
        ref='url',
        fields=('title', 'body'),
        documents=documents
    )
    return idx

index = build_lunr_index(documents)

with open(os.path.join(root_dir, "search_index.json"), "w", encoding="utf-8") as f:
    json.dump(index.serialize(), f, indent=2)  # Save Lunr index as JSON
print("search_index.json updated!")
