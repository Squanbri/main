class SkillsController < ApplicationController
  def index
    @category = Category.find(params[:category_id])
    @competency = Competency.find(params[:competency_id && :category_id])
    @skills = Skill.all
  end
end
