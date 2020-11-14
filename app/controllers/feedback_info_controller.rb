class FeedbackInfoController < ApplicationController
  def feedback_send

    @fio = CGI.escapeHTML(params[:feedback_info][:name])
    @phone = CGI.escapeHTML(params[:feedback_info][:phone])
    @company = CGI.escapeHTML(params[:feedback_info][:company])
    @skills = CGI.escapeHTML(params[:feedback_info][:skills])
    @comment = CGI.escapeHTML(params[:feedback_info][:comment])

    Feedback.feedback_email(@name,@phone,@comment).deliver_now
  end
end
