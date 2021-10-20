
//Schema de modèle:

const mongoose = require('mongoose');
const TodoM = require("./todo");

const todoSchema = mongoose.Schema({
  description: { type: String, required: true },
  memo:{ type: String, required: true },
  priority: { type: Number, required: true },
  updatedAt:{type: Date, required: true},
});

module.exports = mongoose.model('TodoM', todoSchema);




const todos = [
  {
    id: 1,
    description: 'Faire les courses',
    memo: 'Pomme, poire, lessive',
    priority: 1,
    updatedAt: Date.now(),
  },
  {
    id: 2,
    description: 'Envoyer le courrier',
    memo: 'Urgent',
    priority: 2,
    updatedAt: Date.now(),
  },
];

let id = 3;

/*
 * GET todos listing.
 */

exports.findAll = (req, res,next) => {
  TodoM.find()
      .then((todos) => res.status(200).json(todos))
      .catch((error) => res.status(404).json({ error }));
};


/*
 * GET todo by identifier.
 */

exports.findById=(req,res,next)=>{
  TodoM.findById({
    _id:req.params.id
  }).then((todo)=> res.status(200).json(todo)).catch((error)=>{
    res.status(404).json({
      error
    });
  });
}

/*
 * Create a todo.
 */

exports.addTodo =(req, res, next) => {

  const todoM = new TodoM({
    description:req.body.description,
    memo:req.body.memo,
    priority:req.body.priority,
    updatedAt:req.body.updatedAt,
  });
  todoM.save()
      .then(() => res.status(201).json({ message: 'Todo crée avec succès'}))
      .catch(error => res.status(400).json({ error }));
}

/*
 * Update a todo by its identifier.
 */
/*exports.updateTodo = function (req, res) {
  res.json(404, { error: 'Not found' });
};*/

exports.updateTodo=(req,res,next)=>{
  const todoM = new TodoM({
    _id:req.params.id,
    description:req.body.description,
    memo:req.body.memo,
    priority:req.body.priority,
    updatedAt:req.body.updatedAt,
  });
  TodoM.update({_id:req.params.id},todoM).then(()=>{
    res.status(201).json({
      message:'todo updated successfully'
    });
  }).catch((error)=>{res.status(400).json({
    error});
  });

}

/*
 * Delete a todo
 */
/*exports.deleteTodo = function (req, res) {
  res.status(204).end();
  return;
};*/
exports.deleteTodo=(req,res,next)=>{
  TodoM.deleteOne({
    _id:req.params.id}).then(()=>{
      res.status(200).json({
        message:'Deleted'
      });
  }).catch((error)=>{res.status(400).json({
    error
  });
  });

}
