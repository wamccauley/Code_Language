
### Best Time to Buy and Sell Stock

You are given an array `prices` where `prices[i]` is the price of a given stock on the \( i \)-th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

### Approach

**Two-Pointer Technique**

1. **Initialization**:
    - Use two pointers: `l` (left) set to the first day (buy day) and `r` (right) set to the second day (sell day).
    - Initialize `max_profit` to 0.

2. **Iterate through Prices**:
    - While the `r` pointer is within the bounds of the prices array:
        - If the price on the `r` day is greater than the price on the `l` day:
            - Calculate the profit as the difference between `prices[r]` and `prices[l]`.
            - Update `max_profit` with the maximum of the current `max_profit` and the newly calculated profit.
        - If the price on the `r` day is not greater than the price on the `l` day:
            - Move the `l` pointer to the `r` day (consider the current `r` day as the new potential buy day).
        - Move the `r` pointer to the next day.

3. **Return Result**:
    - After iterating through the prices, return the maximum profit stored in `max_profit`.

### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the length of the prices array. Each element is processed at most twice (once by each pointer).

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        l, r = 0, 1
        max_profit = 0

        while r < len(prices):
            if prices[r] > prices[l]:
                profit = prices[r] - prices[l]
                max_profit = max(profit, max_profit)
            else:
                l = r
            r += 1
        
        return max_profit
```