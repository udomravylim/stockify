import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  formData: Product = {
    name: '',
    quantity: 0,
    price: 0,
    category: '',
    description: ''
  };
  isEditing = false;
  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.product) {
      this.isEditing = true;
      this.formData = { ...this.product };
    }
  }

  onSubmit(): void {
    if (!this.formData.name || !this.formData.category || 
        this.formData.quantity < 0 || this.formData.price < 0) {
      this.error = 'Please fill in all required fields with valid values.';
      return;
    }

    this.loading = true;
    this.error = null;

    const operation = this.isEditing && this.product?._id
      ? this.productService.updateProduct(this.product._id, this.formData)
      : this.productService.createProduct(this.formData);

    operation.subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
      },
      error: (err) => {
        this.error = err.message || 'Failed to save product.';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}

