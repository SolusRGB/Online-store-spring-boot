package online.store.model;

import javax.persistence.*;

/**
 * @author Michael Pogrebinsky - www.topdeveloperacademy.com
 * Represents a product stored in a database in the Products table.
 * You do not need to modify this file
 */
@Entity
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String imageFileName;
    private float priceUSD;
    private String category;

    protected Product() {
    }

    public Product(String name, String description, String imageFileName, float priceUSD, String category) {
        this.name = name;
        this.description = description;
        this.imageFileName = imageFileName;
        this.priceUSD = priceUSD;
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public float getPriceUSD() {
        return priceUSD;
    }

}
