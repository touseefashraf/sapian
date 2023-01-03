import { appURL } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
@Component({
    selector: 'app-example-team1',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
    step = 'question' //question, answer, quiz, quiz-answer, result
    quizResult: any = false //true / false
    appLink = ''
    prizeForm: FormGroup
    prizeCounter = 30
    answerSelected = false
    timerRef: any
    modalRef: BsModalRef
    listPrize: any[]
    prizeName: any = ''
    winnerId: any = ''
    submiteEmail: any = false
    loading:any = false
    constructor(
        public ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private route: Router,
        public ms: BsModalService,

    ) {
        this.appLink = encodeURI(appURL)
    }

    ngOnInit() {
        if (this.ds.questionsPerTeam == 0) {
            this.route.navigate(['/'])
            return false
        }
        this.prizeForm = this.fb.group({
            name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            email: new FormControl(null, [Validators.required, , Validators.email, Validators.maxLength(255)])
            //prize_id: new FormControl(null, [Validators.required])
        })
    }
    openModal(modal) {

        this.modalRef = this.ms.show(
            modal,
            {
                class: 'modal-sm modal-dialog website',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }
    answer(status) {
        if (status == 'correct') {
            this.ds.data[this.ds.data.nextTeam].score = this.ds.data[this.ds.data.nextTeam].score + 1
        }

        this.ds.data[this.ds.data.nextTeam].nextQuestion++
        this.ds.data.nextTeam = (this.ds.data.nextTeam == 'teamA' ? 'teamB' : 'teamA')
        this.ds.totalQuestion++

        // console.log('this.ds.totalQuestion', this.ds.totalQuestion)
        // console.log('this.ds.prizeIndex', this.ds.prizeIndex)
        // console.log('Q on prize index', this.ds.prizeQuestionIndexs[this.ds.prizeIndex])

        if (this.ds.prizeQuestionIndexs[this.ds.prizeIndex] == this.ds.totalQuestion) {
            this.step = 'quiz'
            this.timerRef = setInterval( () => {
                this.playAudio()
                this.prizeCounter -= 1
                if (this.answerSelected == false && this.prizeCounter <= 0) {
                    this.quizAnswer('SomeWrongAnswerHere')
                }
            }, 1000)
        } else if (this.ds.data[this.ds.data.nextTeam].nextQuestion == this.ds.questionsPerTeam) {
            this.step = 'result'
        } else {
            this.step = 'question'
        }
    }

    quizAnswer(answer) {
        this.answerSelected = true
        clearInterval(this.timerRef)
        const correctAnswer = this.ds.prizeQuestions[this.ds.prize.nextQuestion].answer
        this.loading = false
        if (answer == correctAnswer) {
            this.ds.randomPrize().subscribe((resp: any) => {
                this.prizeName = resp.data.prize_name
                this.winnerId = resp.data.id
            })
            this.loading = true
            this.quizResult = true

        } else {
            this.quizResult = false
            this.prizeName = ''
            this.winnerId = ''
        }
        this.ds.prize.nextQuestion++
        this.ds.prizeIndex++
        this.step = 'quiz-answer'
    }

    get g() {
        return this.prizeForm.controls
    }

    save(data: any, f: any) {
        if (data.status === 'INVALID') {
            this.alert.error('Si us plau, completa totes les dades del formulari')

            return false
        }

        data.value.id = this.winnerId
        this.submiteEmail = true
        let saveUpdate = this.ds.sendPrize(data.value)

        saveUpdate.subscribe((resp: any) => {
            this.submiteEmail = false
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                /*this.quizResult = false
                this.step = 'question'
                return false*/
            } else {
                this.alert.success('Email enviat amb èxit')
                this.quizResult = false
                this.step = 'question'
            }
        })
    }

    goto() {
        window.location.href = "/"
    }

    quite() {
        this.modalRef.hide()
        this.step = 'result'
        // window.location.href = "/"
    }

    playAudio(){
        let audio = new Audio()
        audio.src = "/assets/audio/beep.mp3"
        audio.load()
        audio.play()
    }
}
