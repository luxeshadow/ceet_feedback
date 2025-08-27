
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\UserController;
use App\Http\Controllers\V1\DepartementController;
use App\Http\Controllers\V1\ModuleController;
use App\Http\Controllers\V1\PhaseController;
use App\Http\Controllers\V1\TypeFeedbackController;
use App\Http\Controllers\V1\FeedbackController;

Route::prefix('v1')->group(function () {
    // Users
    Route::post('/register', [UserController::class, 'createUser']);
    Route::post('/login', [UserController::class, 'loginUser']);

    Route::get('/departements/all', [DepartementController::class, 'getAllDepartements']);
    Route::get('/type-feedbacks/all', [TypeFeedbackController::class, 'getAllTypefeedbacks']);
    Route::get('/modules/all', [ModuleController::class, 'getAllModules']);

    //Search Feedbacks
    Route::get('/feedbacks/group/{groupId}', [FeedbackController::class, 'findByGroupId']);
  

    // Routes protégées
    Route::middleware('auth:sanctum')->group(function () {

        // Deconnexion
        Route::post('/logout', [UserController::class, 'logoutUser']);

        // Gestion des Departements
        Route::post('/departements', [DepartementController::class, 'createDepartement']); 
        Route::get('/departements', [DepartementController::class, 'getDepartements']); 
        Route::put('/departements/{id}', [DepartementController::class, 'updateDepartement']);
        Route::delete('/departements/{id}', [DepartementController::class, 'deleteDepartement']);

        // Gestion des Modules
        Route::post('/modules', [ModuleController::class, 'createModule']);
        Route::get('/modules', [ModuleController::class, 'getModules']);
        Route::put('/modules/{id}', [ModuleController::class, 'updateModule']);
        Route::delete('/modules/{id}', [ModuleController::class, 'deleteModule']);

        // Gestion des Phases
        Route::post('/phases', [PhaseController::class, 'createPhase']);
        Route::get('/phases', [PhaseController::class, 'getPhases']);
        Route::put('/phases/{id}', [PhaseController::class, 'updatePhase']);
        Route::delete('phases/{id}', [PhaseController::class, 'deletePhase']);
        
        // Gestion des TypeFeedbacks
        Route::post('/type-feedbacks', [TypeFeedbackController::class, 'createTypeFeedback']); 
        Route::get('/type-feedbacks', [TypeFeedbackController::class, 'getTypeFeedbacks']); 
        Route::put('/type-feedbacks/{id}', [TypeFeedbackController::class, 'updateTypeFeedback']);
        Route::delete('/type-feedbacks/{id}', [TypeFeedbackController::class, 'deleteTypeFeedback']);

        // Gestion des phases d'un module
        Route::prefix('modules/{module}')->group(function () {
            Route::get('/phases', [ModuleController::class, 'getPhases']);
            Route::post('/phases', [ModuleController::class, 'attachPhase']);
            Route::delete('/phases', [ModuleController::class, 'detachPhase']);
        });

       // Gestion des Feedbacks
        Route::post('/feedbacks', [FeedbackController::class, 'createFeedback']);
        Route::get('/feedbacks', [FeedbackController::class, 'userFeedbacks']);
      



    });
});
