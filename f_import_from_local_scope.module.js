import { f_a_o_url_stack_trace } from "./f_a_o_url_stack_trace.module.js"
import { o_test_config } from "./o_test_config.module.js";
var f_import_from_local_scope = async function(){
    f_import_from_file_url("./o_test_config.module.js");
}
var f_import_from_file_url = async function(s_path_relative){
    var s_import_meta_url = import.meta.url;
    var s_import_meta_url_path_to_relative_file = s_import_meta_url.split("/").slice(0,-1).concat([s_path_relative]).join("/")
    
    //
    var a_o_url_stack_trace = f_a_o_url_stack_trace();
    var o_url = a_o_url_stack_trace.slice(-1)[0];
    var s_fileurl_path = o_url.o_URL.href;
    var s_fileurl_path_to_relative_file = s_fileurl_path.split("/").slice(0,-1).concat([s_path_relative]).join("/")
    var s_fileprotocol = "file://";
    
    try{
        // obviously Deno.stat does not work with "file://" urls ...
        var s_absolutepath_to_relative_file = s_fileurl_path_to_relative_file.substring(
            s_fileurl_path_to_relative_file.indexOf(s_fileprotocol)+ s_fileprotocol.length
        )    
        var o_stat = Deno.stat(s_absolutepath_to_relative_file)
    }catch{
        var s_response = await fetch(s_import_meta_url_path_to_relative_file);
        await Deno.writeTextFile(s_response.body, s_fileurl_path_to_relative_file);
        console.log(`${s_fileurl_path_to_relative_file}: file not existing yet, has been downloaded`)
    }

    var o = await import(s_fileurl_path_to_relative_file);

}


export {f_import_from_local_scope}