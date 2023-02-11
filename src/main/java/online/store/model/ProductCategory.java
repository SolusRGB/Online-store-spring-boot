package online.store.model;

import javax.persistence.*;

/**
 * Represents a product category stored in a database.
 */
@Entity
@Table(name = "ProductCategories")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String category;

    public ProductCategory() {
    }

    public ProductCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
