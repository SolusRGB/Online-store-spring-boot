package online.store.model;

import java.util.List;

public class CheckoutRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String shippingAddress;
    private List<ProductInfo> products;

    private String creditCard;

    public static class ProductInfo {
        private long productId;
        private long quantity;

        public ProductInfo() {
        }

        public ProductInfo(long productId, long quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        public long getProductId() {
            return productId;
        }

        public long getQuantity() {
            return quantity;
        }

        public void setProductId(long productId) {
            this.productId = productId;
        }

        public void setQuantity(long quantity) {
            this.quantity = quantity;
        }
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

    public List<ProductInfo> getProducts() {
        return products;
    }

    public String getCreditCard() {
        return creditCard;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public void setProducts(List<ProductInfo> products) {
        this.products = products;
    }

    public void setCreditCard(String creditCard) {
        this.creditCard = creditCard;
    }

}

