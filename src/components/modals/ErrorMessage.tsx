//COMPONENTE ERROR-MESSAGE

//type
type ErrorMessageProps = {
    error: string
}

function ErrorMessage( { error } : ErrorMessageProps ) {
  return (
    <>
        <p className="p-2 text-sm text-center font-bold text-white bg-red-600">
            {error}
        </p>
    </>
  )
}

export default ErrorMessage