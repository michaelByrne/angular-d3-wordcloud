import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { D3CloudComponent } from './d3-cloud/d3-cloud.component';
import { D3CloudService } from './d3-cloud.service';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [],
	declarations: [D3CloudComponent],
	exports: [D3CloudComponent]
})
export class NgCloudModule {
	static forRoot() {
		return {
			ngModule: NgCloudModule,
			providers: [D3CloudService]
		}
	}
}
