(module
 (type $0 (func (param i32 i32) (result i32)))
 (memory $0 0)
 (export "add" (func $assemblyscript/index/add))
 (export "memory" (memory $0))
 (func $assemblyscript/index/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
)
