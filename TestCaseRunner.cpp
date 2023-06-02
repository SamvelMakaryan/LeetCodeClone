#include <fstream>
#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <iterator>
#include <algorithm>
#include <chrono>

int main(int argc, char** argv) {
    std::string lang = argv[1];
    std::string command = "";
    std::string firstArg;
    std::string secondArg;
    std::string mode = argv[2];
    int result;
    std::ofstream finalRes("final.txt");
    std::vector<int> params;
    if ( lang == "python") {
        command += "python3 file.py";
    } else if (lang == "c++") {
        command += "./file ";
    } else if (lang == "java") {
        command += "java file";    
    } else if (lang == "js") {
        command += "node file.js";
    }
    std::ifstream infile((mode + ".txt").c_str(), std::ios::in);
    int count_of_rows = std::count(std::istreambuf_iterator<char>(infile), std::istreambuf_iterator<char>(), '\n');
    infile.close();
    infile.open((mode + ".txt").c_str(), std::ios::in);
    std::string line;
	auto start_time = std::chrono::high_resolution_clock::now();
    int test_case = 0;
    while (std::getline(infile, line)) {
        std::stringstream ss(line);
        std::vector<int> numbers;
        int number;
        while (ss >> number) {
            numbers.push_back(number);
            if (ss.peek() == ',') {
                ss.ignore();
            }
        }
        if (numbers.size() != 3) {
            std::cout << "Error: expected three numbers, but found " << numbers.size() << std::endl;
            continue;
        }
        firstArg = std::to_string(numbers[0]);
        secondArg = std::to_string(numbers[1]);
        system((command + " " + firstArg + " " +secondArg).c_str());
        std::ifstream output("output.txt", std::ios::in);
        output >> result;
        if (result != numbers[2]) {
            finalRes << "The test case for Args: " << numbers[0] << " and " << numbers[1] << " is not correct\nexpected: " << numbers[2] << "\n";
            finalRes << "Case: " << test_case << "/" << count_of_rows << " not passed\n";
            return 0;
        }
        numbers.clear();
        ++test_case;(mode + ".txt").c_str();
    }
    auto end_time = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end_time - start_time);
    finalRes << "Passed" << "\n" << "Runtime - " << (duration.count() / count_of_rows) << " ms\n";
}
