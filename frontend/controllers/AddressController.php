<?php

namespace frontend\controllers;

use yii\filters\Cors;
use Yii;
use yii\web\Response;

class AddressController extends \yii\rest\ActiveController
{
  public $modelClass = 'frontend\models\Address';

  public function behaviors()
  {
    $behaviors = parent::behaviors();

    // remove authentication filter
    $auth = $behaviors['authenticator'];
    unset($behaviors['authenticator']);

    // add CORS filter
    $behaviors['corsFilter'] = [
      'class' => Cors::class,
    ];

    // re-add authentication filter
    $behaviors['authenticator'] = $auth;
    // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
    $behaviors['authenticator']['except'] = ['options'];

    return $behaviors;
  }

  public function beforeAction($action)
  {
    if ($action->id == 'writeSession') {
      Yii::$app->controller->enableCsrfValidation = false;
    }
    Yii::$app->response->format = Response::FORMAT_JSON;

    return parent::beforeAction($action);
  }
}
