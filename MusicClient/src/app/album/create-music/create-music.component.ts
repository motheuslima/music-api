import { Component,Input,forwardRef,OnInit,OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl,NG_ASYNC_VALIDATORS,NG_VALUE_ACCESSOR, NG_VALIDATORS,FormBuilder, ControlValueAccessor,Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
export interface FooFormValues {
    id: number,
    toto: number,
}

@Component({
  selector: 'app-create-music',
  templateUrl: './create-music.component.html',
  styleUrls: ['./create-music.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateMusicComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreateMusicComponent),
      multi: true
    }
  ]
})
export class CreateMusicComponent implements OnInit, OnDestroy, ControlValueAccessor,AfterViewInit {
  @Input() inErrors: any[];

  @Input() index: number;

  @Output() removeMusic: EventEmitter<any> = new EventEmitter();

  destroy$: Subject<boolean> = new Subject<boolean>();
    
  FooForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

    ) { 
    }

  get f() { return this.FooForm.controls; }

  ngOnInit(): void {
    this.initForm();
    this.FooForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
        this.onChange(value);
        this.onTouched();
    });    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get value(): FooFormValues {
    return this.FooForm.value;
  }

  set value(value: FooFormValues) {
    if (value !== undefined ) {      
        this.FooForm.patchValue(value);
        this.onChange(value);
        this.onTouched();
    }
  }

  onChange: any = () => {}
  onTouched: any = () => {}

  ngAfterViewInit(){
    setTimeout(()=>{
      this.FooForm.updateValueAndValidity();
    })
  }

  writeValue(value: any) {
    if (value) {
        this.value = value;
    }
    if (value === null) {
      this.FooForm.reset();
    }
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.FooForm.valid ? null : { profile: { valid: false } };
  }

  get errors() {
    return this.FooForm.errors ? null : this.FooForm.errors;
  }

  initForm() {
    this.FooForm = this.formBuilder.group({
        id: 0,
        name: ['', [Validators.required]],
        albumId: 0
    });
  }

  onSubmitForm() {}

  onRemoveMusic() {
    this.removeMusic.emit(this.index);
  }

}
