import { AnswerTeam2Component } from './answer-team2/answer-team2.component';
import { ExampleTeam2Component } from './example-team2/example-team2.component';
import { AnswerTeam1Component } from './answer-team1/answer-team1.component';
import { QuizComponent } from './quiz/quiz.component';
import { InstructionsTwoComponent } from './instructions-two/instructions-two.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { IRangeSliderModule } from './../../libs/irange-slider/irange-slider.module';
import { ModalModule } from 'ngx-bootstrap/modal'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from './../shared/shared.module'
import { NgModule } from '@angular/core'
import { IndexComponent } from './index.component'
import { RouterModule } from '@angular/router'
import { AutocompleteLibModule } from 'angular-ng-autocomplete'
import { DataService } from './data.service'

@NgModule({
    imports: [
        AutocompleteLibModule,
        IRangeSliderModule,
        ModalModule.forRoot(),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: IndexComponent
            },
            {
                path: 'instructions',
                component: InstructionsComponent
            },
            {
                path: 'instructions-two',
                component: InstructionsTwoComponent
            },
            {
                path: 'quiz',
                component: QuizComponent
            },
            {
                path: 'answer-team1',
                component: AnswerTeam1Component
            },
            {
                path: 'example-team2',
                component: ExampleTeam2Component
            },
            {
                path: 'answer-team2',
                component: AnswerTeam2Component
            }
        ])
    ],
    declarations: [IndexComponent,
        InstructionsComponent,
        InstructionsTwoComponent,
        QuizComponent,
        AnswerTeam1Component,
        ExampleTeam2Component,
        AnswerTeam2Component
    ],

    providers: [DataService]
})
export class IndexModule { }
