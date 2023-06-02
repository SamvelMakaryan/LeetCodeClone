#include <iostream>
#include <string>
#include <fstream>
#include "Solution.cpp"

int main(int argc, char** argv) 
{
    std::ofstream file("output.txt");
    int arg1;
    int arg2;
    arg1 = atoi(argv[1]);
    arg2 = atoi(argv[2]);
	int res = twoSum(arg1, arg2);
    file << res ;
}
