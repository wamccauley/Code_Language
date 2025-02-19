# Code-Memo

#### Code Memo

Welcome to my [Code Memo](https://mouhamaddev.github.io/Code-Memo/)! I forget a lot! So I created this simple project, which is a collection of my notes on various programming topics, including Python, Django, Django REST Framework (DRF), algorithms and data structures (maybe some leetcode problems), and Linux. This serves as my personal reference to help me recall concepts quickly. I hope you find it useful as well.

## Table of Contents

1. [Python](/python.md)
2. [Django and Django REST Framework (DRF)](/django.md)
3. [Data Structures and Algorithms](/dsa.md)
4. [Software Engineering Principles](/sep.md)
5. [DevOps and Deployment](/devops.md)
6. [System Design and Architecture ⏳](/system-design.md)
7. [API Design ⏳](/api-design.md)
8. [Database Management ⏳](/db-management.md)
9. [Basics of Data Science and Machine Learning ⏳](/ds-and-ml.md)
10. [Basics of Server Administration ⏳](/ds-and-ml.md)
11. [Linux](/linux.md)
12. [Misc](/misc.md)
13. [Interview Preparation ⏳](/interviews.md)

<p>
  <a href="#" onclick="randomPage();" style="text-decoration:none;">
    <button style="padding:10px 15px; font-size:14px; color:white; background-color:#007BFF; border:none; border-radius:5px; cursor:pointer;">
      Take Me to a Random Page &nbsp; 🎲
    </button>
  </a>
</p>

<script>
  async function randomPage() {
    try {
      const response = await fetch('pages.json');
      const data = await response.json();
      
      if (data.pages.length > 0) {
        const randomPage = data.pages[Math.floor(Math.random() * data.pages.length)];
        window.location.href = randomPage;
      } else {
        console.error("No pages found");
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  }
</script>

<br>

Note: This project is a bunch of personal notes. While you may find them useful, it's intended more as a quick reference rather than a learning resource, ideal for a brief review 5 minutes before your next interview :D

Feel free to explore each section and make use of the information as needed. If you have any suggestions or contributions, please don't hesitate to create a pull request or open an issue.

And don't forget to take notes! ❤️

Version: 2.3.2
