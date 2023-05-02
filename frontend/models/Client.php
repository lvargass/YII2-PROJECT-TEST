<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "{{%client}}".
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $phone
 * @property int|null $created_at
 * @property int|null $updated_at
 */
class Client extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%client}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['first_name', 'last_name'], 'required'],
            [['created_at', 'updated_at'], 'integer'],
            [['first_name', 'last_name', 'phone'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'first_name' => 'First Name',
            'last_name' => 'Last Name',
            'phone' => 'Phone',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
    public function fields()
    {
    
        $fields = parent::fields();
    
        $fields['Address'] = function ($model) { return $this->getAddress(); };
        $fields['Perfil'] = function ($model) { return $this->getPerfil(); };
    
        return $fields;
    
    }

    private function getAddress() { return $this->hasOne(Address::class, ['client_id' => 'id'])->all(); }
    private function getPerfil() { return $this->hasOne(Perfil::class, ['client_id' => 'id'])->all(); }
}
