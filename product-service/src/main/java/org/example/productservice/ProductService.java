package org.example.productservice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
	private final ProductRepository productRepository;

	public Optional<Product> getProductById(long id) {
		return productRepository.findById(id);
	}

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	public Product createProduct(Product product) {
		return productRepository.save(product);
	}

	public Product createOrUpdate(long id, Product product) {
		product.setId(id);
		return productRepository.save(product);
	}
}

