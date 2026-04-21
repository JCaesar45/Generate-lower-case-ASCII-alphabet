import java.util.ArrayList;
import java.util.List;

public class Lascii {
    public static List<Character> lascii(char start, char end) {
        List<Character> result = new ArrayList<>();
        
        for (char c = start; c <= end; c++) {
            result.add(c);
        }
        
        return result;
    }

    public static void main(String[] args) {
        System.out.println(lascii('a', 'd'));  // [a, b, c, d]
        System.out.println(lascii('c', 'i'));  // [c, d, e, f, g, h, i]
        System.out.println(lascii('t', 'z'));  // [t, u, v, w, x, y, z]
    }
}
