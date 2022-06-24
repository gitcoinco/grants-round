import { Button } from "./styles"

export interface FormStepperProps {
  currentStep: number,
  stepsCount: number,
  disableNext: boolean,
  prev: () => void,
  next: () => void,
}

export function FormStepper({ disableNext = false, ...props }: FormStepperProps) {
  return (
    <div className="flex justify-end space-x-4 mt-6">
      {props.currentStep > 1 &&
        <Button $variant="outline" onClick={props.prev}>Previous</Button>}

      <Button $variant="solid" disabled={disableNext} onClick={props.next}>
        {props.currentStep === props.stepsCount ? "Deploy" : "Next"}
      </Button>
    </div>
  )
}