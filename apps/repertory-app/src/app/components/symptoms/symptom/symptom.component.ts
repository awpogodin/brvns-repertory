import { Component, Input } from "@angular/core";
import { SymptomDTO } from "../../../../../../../common/dto/symptom.dto";

@Component({
    selector: "brvns-repertory-symptom",
    templateUrl: "./symptom.component.html",
    styleUrls: ["./symptom.component.scss"],
})
export class SymptomComponent {
    @Input() symptom: SymptomDTO;
    @Input() isParent = false;

    onClick(): void {
        console.log('hi');
    }
}
