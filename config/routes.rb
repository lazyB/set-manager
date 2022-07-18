Rails.application.routes.draw do
  resources :react_apps
  devise_for :users,
             path: '/users',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             },
             defaults: {
               format: :json
             }
  resources :songs
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "react_app#index"
  get '*path', to: 'react_app#index', format: :html
end
