//ui-card.ts
import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { CardSection, Theme } from './ui-card.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.css',
})

export class UiCard {
  @Input() title: string = '';
  @Input() theme: Theme = "light";
  @Input() cardContent: CardSection[] = [];

  @Output() onSave = new EventEmitter<{index: number, newValue: string | string[]}>();

  editingIndex: number | null = null;
  tempValue: any = '';
  newItemText: string = '';

  startEdit(index: number, section: CardSection) {
    this.editingIndex = index;
    this.tempValue = Array.isArray(section.value) ? [...section.value] : section.value;
  }

  addListItem() {
    if (this.newItemText.trim()) {
      this.tempValue.push(this.newItemText.trim());
      this.newItemText = '';
    }
  }

  removeListItem(itemIndex: number) {
    this.tempValue.splice(itemIndex, 1);
  }

  cancelEdit() {
    this.editingIndex = null;
    this.tempValue = '';
    this.newItemText = '';
  }

  confirmSave(index: number) {
    this.onSave.emit({ index, newValue: this.tempValue });
    this.editingIndex = null;
  }
}
