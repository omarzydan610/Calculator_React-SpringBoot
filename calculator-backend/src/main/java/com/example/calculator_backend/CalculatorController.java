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
            if (Double.isInfinite(result)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Division by zero");
            }
            return ResponseEntity.ok(result);
        } catch (ArithmeticException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Division by zero");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expression format");
        }
    }
}
