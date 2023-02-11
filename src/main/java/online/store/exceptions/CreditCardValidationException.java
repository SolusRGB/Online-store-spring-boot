package online.store.exceptions;

/**
 * @author Michael Pogrebinsky - www.topdeveloperacademy.com
 * Credit Card Validation exception, thrown when an invalid or stolen credit card is used during purchase
 */
public class CreditCardValidationException extends RuntimeException {
    public CreditCardValidationException(String message) {
        super(message);
    }
}
