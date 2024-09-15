package org.example.productservice;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("products")
public class ProductController  {
	private final ProductService productService;


	@GetMapping("/{id}")
	public Optional<Product> getProductById(@PathVariable long id) {
		return productService.getProductById(id);
	}


	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}


	@PostMapping
	public Product createProduct(@RequestBody Product product) {
		return productService.createProduct(product);
	}

	@PutMapping("/{id}")
	public Product createOrUpdate(@PathVariable long id, @RequestBody Product product) {
		return productService.createOrUpdate(id, product);
	}
}
