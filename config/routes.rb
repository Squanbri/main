Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'category#categories'

  get 'competencys' => 'category#competencys'
  get 'skills' => 'category#skills'
end
