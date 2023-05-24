<?php
/**
 * JDC Plugin
 *
 * @package JDCPlugin
 */

class JDCPlugin extends Omeka_Plugin_AbstractPlugin
{
    protected $_hooks = array(
        'install',
        'uninstall',
        'define_acl'
    );

    public function hookInstall()
    {
        // Register the jdc namespace and import the jdc ontology file
        $namespace = 'jdc';
        $namespaceUri = 'https://jardindesconnaissances.univ-paris8.fr/onto/jdc#';
        $vocabularyFile = 'plugins/JDCPlugin/jdc.ttl';
        insert_vocabulary($namespace, $namespaceUri, $vocabularyFile);
    }

    public function hookUninstall()
    {
        // Remove the jdc namespace and its associated resources
        $namespace = 'jdc';
        remove_vocabulary($namespace);
    }

    public function hookDefineAcl($args)
    {
        $acl = $args['acl'];

        // Define access control for jdc resources
        $acl->addResource('jdc:SemanticPosition');
        $acl->addResource('jdc:Crible');
        $acl->addResource('jdc:CriblePosition');
        $acl->addResource('jdc:CribleCarto');
        $acl->addResource('jdc:Actant');
        $acl->addResource('jdc:Doc');
        $acl->addResource('jdc:Rapport');
        $acl->addResource('jdc:Concept');
        $acl->addResource('jdc:Transcription');
    }
}
