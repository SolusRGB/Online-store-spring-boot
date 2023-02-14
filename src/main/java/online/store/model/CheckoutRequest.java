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
    }

}

