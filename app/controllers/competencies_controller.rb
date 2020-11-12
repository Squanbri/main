class CompetenciesController < ApplicationController
  def index
    @category = Category.find(params[:category_id])
    @competencys = Competency.all
  end
end
