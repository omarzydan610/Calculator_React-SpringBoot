package com.example.calculator_backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {

    @GetMapping("/equal")
    public ResponseEntity<?> evaluate(@RequestParam String expression) {
        try {
            expression = expression.replace("%", "*.01");
            Expression exp = new ExpressionBuilder(expression).build();
            double result = exp.evaluate();
            return ResponseEntity.ok(result);
        } catch (ArithmeticException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Division by zero");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expression format");
        }
    }

    public boolean isNumeric(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        return str.matches("[\\d-.]+");
    }

    @GetMapping("/flip")
    public ResponseEntity<?> exp2(@RequestParam String param) {
        if (isNumeric(param)) {
            double exp = Double.parseDouble(param);
            if (exp == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Division by zero");
            } else {
                return ResponseEntity.ok((1 / exp));
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expression format");
        }
    }

    @GetMapping("/root")
    public ResponseEntity<?> root(@RequestParam String param) {
        if (isNumeric(param)) {
            double exp = Double.parseDouble(param);
            if (exp < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Negative value");
            } else {
                return ResponseEntity.ok(Math.sqrt(exp));
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expression format");
        }
    }

    @GetMapping("/exp2")
    public ResponseEntity<?> flip(@RequestParam String param) {
        if (isNumeric(param)) {
            double exp = Double.parseDouble(param);
            return ResponseEntity.ok((exp * exp));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expression format");
        }
    }

}
