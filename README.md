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

##### fontFace: string
- Not currently implemented, defaults to "Impact"

#### minFontSize: number

#### maxFontSize: number

#### spiral: string
- "rectangular" or "archimedean." Read up on what this means (and how the algorithm works) [here](https://www.jasondavies.com/wordcloud/about/).

##### fontWeight: string
- Not current implemented, defaults to "normal"

#### rotationLow: number
- The lowest possible rotation angle. Defaults to -90 degrees.

#### rotationHigh: number
- The highest possible rotation angle. Defaults to 90 degrees.

#### rotationNum: number
- The number of possible rotations. Each word is randomly assigned a rotation from the lowest possible angle to highest possible angle. If there are three possible angles from -90 to 90, then the words could be rotated -90 degrees, 0 degrees, or 90 degrees. Five possible would make the possibilities -90, -45, 0, 45, 90. And so forth. 

## Example

The outer App Module in this project demonstrates the word cloud and offers some options to play around with it. It can also serve as a guideline for using it in your own projects. It's an Angular CLI project so just a usual npm install and then ng serve will get you up and running locally.  




