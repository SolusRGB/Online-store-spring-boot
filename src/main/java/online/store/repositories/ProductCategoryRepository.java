package online.store.repositories;

import online.store.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This represents an API through which we can perform CRUD operations against the
 * ProductsCategories table in the database
 */
@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

    /**
     * Returns all the available categories of products in our online store
     */
    List<ProductCategory> findAll();
}
