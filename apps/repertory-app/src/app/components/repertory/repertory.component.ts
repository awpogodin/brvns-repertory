import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { RestApiService } from "../../services/rest-api.service";
import { CategoryDTO } from "../../../../../../common/dto/category.dto";

@Component({
    selector: "brvns-repertory-repertory",
    templateUrl: "./repertory.component.html",
    styleUrls: ["./repertory.component.scss"],
})
export class RepertoryComponent implements OnInit {
    public loading = true;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public categoryCtrl = new FormControl();
    public filteredCategories: Observable<CategoryDTO[]>;
    public inputCategories: string[] = [];
    public allCategories: CategoryDTO[] = [];

    @ViewChild("categoryInput") categoryInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoCategory") autoCategory: MatAutocomplete;

    constructor(private restApiService: RestApiService) {
        this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
            startWith(null),
            map((category: CategoryDTO | null) =>
                category
                    ? this._filter(category.title)
                    : this.allCategories.slice()
            )
        );
    }

    ngOnInit(): void {
        this.restApiService.getAllCategories().subscribe((res) => {
            this.allCategories = res;
            this.loading = false;
        });
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our category
        if ((value || "").trim()) {
            this.inputCategories.push(value);
        }

        // Reset the input value
        if (input) {
            input.value = "";
        }

        this.categoryCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.inputCategories.indexOf(fruit);

        if (index >= 0) {
            this.inputCategories.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.inputCategories.push(event.option.viewValue);
        this.categoryInput.nativeElement.value = "";
        this.categoryCtrl.setValue(null);
    }

    private _filter(value: string): CategoryDTO[] {
        const filterValue = value.toLowerCase();

        return this.allCategories.filter((category) =>
            category.title.toLowerCase().startsWith(filterValue)
        );
    }
}
