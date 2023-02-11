package online.store.model;

import javax.persistence.*;

/**
 * @author Michael Pogrebinsky - www.topdeveloperacademy.com
 * Represents an order of a product from our online store, stored in the Orders table.
 * Each order can contain multiple items of the same product
 * You do not need to modify this file
 */
@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String shippingAddress;
    private long quantity;
    private String creditCard;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    public Order() {
    }

    public Order(String firstName, String lastName, String email, String shippingAddress, long quantity, Product product, String creditCard) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.shippingAddress = shippingAddress;
        this.quantity = quantity;
        this.product = product;
        this.creditCard = creditCard;
    }

    public Long getId() {
        return id;
    }

    public long getQuantity() {
        return quantity;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }


    public String getShippingAddress() {
        return shippingAddress;
    }

    public Product getProduct() {
        return product;
    }

    public String getCreditCard() {
        return creditCard;
    }
}
