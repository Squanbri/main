class SkillsController < ApplicationController
  before_action :set_skill, only: %i[show create]

  def show
    @category = @competency.category
    @skills = @competency.skills
    @skill = Skill.new
  end

  def create
    @skill = @competency.skills.create(skill_params)
    @skill.save
    redirect_to category_competency_skill_path(@skill.competency.category, @skill.competency, @skill)
  end

  def destroy
    @skill = Skill.find(params[:competency_id && :category_id && :id])
    @skill.destroy
    redirect_to category_competency_skill_path(@skill.competency.category, @skill.competency, @skill)
  end

  def edit
    @skill = Skill.find(params[:id])
    @competency = @skill.competency
    @category = @competency.category
  end

  def update
    @skill = Skill.find(params[:id])
    @skill.update_attributes(skill_params)
    redirect_to category_competency_skill_path(@skill.competency.category, @skill.competency, @skill)
  end

  private

  def skill_params
    params.require(:skill).permit(:title)
  end

  def set_competency
    @competency = Competency.find(params[:competency_id])
  end
end

