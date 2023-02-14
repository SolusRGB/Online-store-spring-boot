package online.store.controllers;


import online.store.model.wrappers.ProductsWrapper;
import online.store.services.ProductsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
public class HomepageController {
    private final ProductsService productService;

    public HomepageController(ProductsService productService) {
        this.productService = productService;
    }

    @GetMapping("/categories")
    public String getProductCategories() {
        return String.join(", ", productService.getAllSupportedCategories());
    }

    @GetMapping("/deals_of_the_day/{number_of_products}")
    public ProductsWrapper getDealsOfTheDay(
            @PathVariable(name = "number_of_products") int numberOfProducts) {
        return new ProductsWrapper(productService.getDealsOfTheDay(numberOfProducts));
    }

    @GetMapping("/products")
    public ProductsWrapper getProductsForCategory(
            @RequestParam(name = "category", required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return new ProductsWrapper(productService.getProductsByCategory(category));
        }
        return new ProductsWrapper(productService.getAllProducts());
    }
}


