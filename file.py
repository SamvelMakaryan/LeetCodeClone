import sys
import Solution

arg1 = int(sys.argv[1])
arg2 = int(sys.argv[2])
res = Solution.twoSum(arg1, arg2)
with open('output.txt', 'w') as file:
    file.write(str(res))
