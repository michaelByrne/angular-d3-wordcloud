# AngularD3Cloud

Angular component implementing Wordle-style wordcloud layouts based on [Jason Davies' D3-Cloud](https://github.com/jasondavies/d3-cloud). 

The component itself is in the ng-cloud directory, which can be dropped into another project as is. Its only dependency is D3, so just install D3 like normal and you're good. D3 typings aren't needed. You'll want to import the module as such:

import { NgCloudModule } from './ng-cloud/ng-cloud.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		...,
		NgCloudModule.forRoot(),
		...
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

## API

The component's API looks like this. The main things you'd want to mess with are the font mins and maxes and the number of possible rotation angles (to a max of 10). 

#### fontFace: string
- Not currently implemented, defaults to "Impact"

minFontSize: number

maxFontSize: number

spiral: string

fontWeight: string
- Not current implemented, defaults to "normal"

rotationLow: number

rotationHigh: number

rotationNum: number

padding: number


