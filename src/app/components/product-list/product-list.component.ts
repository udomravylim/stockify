import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string | null = null;
  categories: string[] = [];
  expandedDescriptions: Set<string> = new Set();
  maxDescriptionLength = 100;
  loading = true;
  error: string | null = null;
  showForm = false;
  editingProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [];
        this.filteredProducts = this.products;
        // Extract unique categories
        this.categories = [...new Set(this.products.map(p => p.category).filter(Boolean))].sort();
        this.loading = false;
        this.cdr.detectChanges(); // Force change detection
      },
      error: (err) => {
        this.error = `Failed to load products: ${err.message || err.statusText || 'Unknown error'}. Make sure the server is running on port 3000.`;
        this.loading = false;
        this.products = [];
      }
    });
  }

  openCreateForm(): void {
    this.editingProduct = null;
    this.showForm = true;
  }

  openEditForm(product: Product): void {
    this.editingProduct = { ...product };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingProduct = null;
  }

  onProductSaved(): void {
    this.closeForm();
    this.loadProducts();
  }

  deleteProduct(id: string | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          alert('Failed to delete product: ' + err.message);
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  filterProducts(): void {
    let filtered = [...this.products];

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        (product.description && product.description.toLowerCase().includes(search))
      );
    }

    this.filteredProducts = filtered;
  }

  filterByCategory(category: string | null): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.filterProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.selectedCategory = null;
    this.filteredProducts = this.products;
  }

  isDescriptionLong(description: string | undefined): boolean {
    return description ? description.length > this.maxDescriptionLength : false;
  }

  getTruncatedDescription(description: string | undefined): string {
    if (!description) return '';
    if (description.length <= this.maxDescriptionLength) return description;
    return description.substring(0, this.maxDescriptionLength) + '...';
  }

  isExpanded(productId: string | undefined): boolean {
    return productId ? this.expandedDescriptions.has(productId) : false;
  }

  toggleDescription(productId: string | undefined): void {
    if (!productId) return;
    if (this.expandedDescriptions.has(productId)) {
      this.expandedDescriptions.delete(productId);
    } else {
      this.expandedDescriptions.add(productId);
    }
  }
}

