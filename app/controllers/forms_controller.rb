class FormsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @form = Form.new(form_params)

    if @form.save
      render json: @form, status: :created
      #FormMailer.form_send(@form).deliver
      FeedbackMailer.with(form: @form).feedback_email.deliver_now
    else
      render json: "Some error", status: :bad_request
    end
  end

  private
  def form_params
    params.require(:form).permit(:fio, :phone, :company, :comment, :skills)
  end
end
