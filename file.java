import java.io.*;
// import Solution.*;
public class file {
    public static void main(String[] args) {
        int a, b;
        a = Integer.parseInt(args[0]);
        b = Integer.parseInt(args[1]);
        int sum = Solution.twoSum(a, b);
        try {
            FileWriter writer = new FileWriter("output.txt");
            writer.write("" + sum);
            writer.close();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}
