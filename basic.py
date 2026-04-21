def lascii(start, end):
    return [chr(i) for i in range(ord(start), ord(end) + 1)]

# Tests
print(lascii('a', 'd'))   # ['a', 'b', 'c', 'd']
print(lascii('c', 'i'))   # ['c', 'd', 'e', 'f', 'g', 'h', 'i']
print(lascii('t', 'z'))   # ['t', 'u', 'v', 'w', 'x', 'y', 'z']
