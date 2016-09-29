<?php

/*
 * Database class for MySQLi
 */

require_once '../Login/psl-config.php';

class DB {

    /**
     * 
     * @param type $ini String pointing to a *.ini file with DB configuration settings.
     */
    public $result = [];
    public $num_rows = 0;
    private $con;
    public $lastSQL;

    function __construct($logFile = DB_LOG_FILE, $debugMode = DEBUG) {
        date_default_timezone_set(TIMEZONE);
        $this->logFile = $logFile;
        try {
            $this->con = new PDO('mysql:dbname=' . DATABASE . ';host=' . HOST, USER, PASSWORD);
            if ($debugMode) {
                $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
        } catch (PDOException $e) {
            $this->log("CONNECTION FAILED:" . $e->getMessage());
        }
    }

    function __destruct() {
        if ($this->con) {
            $this->con = NULL;
        }
    }

    private function log($message, $query = NULL, $vars = NULL) {
        $logError = [
            'time' => date(DATE_RFC2822),
            'message' => $message
        ];
        if ($query) {
            $logError['sql'] = $query;
        }
        if ($vars) {
            $logError['var_dump'] = $vars;
        }
        $JSON = json_decode(file_get_contents($this->logFile));
        array_push($JSON, $logError);
        file_put_contents($this->logFile, json_encode($JSON));
    }

    public function select($table, $rows = '*', $where = null, $order = null, $limit = null) {
        if ($this->con) {
            $sql = "SELECT $rows FROM $table";
            if ($where) {
                $sql.=" WHERE ";
                foreach ($where as $key => $value) {
                    $sql.=" $key = :$key AND";
                }
                $sql = substr($sql, 0, -3);
            }
            if ($order) {
                $sql.=" ORDER BY $order";
            }
            if ($limit) {
                $sql.=" LIMIT $limit";
            }
            try {
                $this->lastSQL = $sql;
                $stmt = $this->con->prepare($sql);
                $stmt->execute($where);
                $this->result = $stmt->fetchAll();
                $this->num_rows = count($this->result);
                return TRUE;
            } catch (PDOException $e) {
                $error = "QUERY FAILED=>" . $e->getMessage();
                $this->log($error, $sql,$where);
                return FALSE;
            }
        } else {
            return FALSE;
        }
    }

    public function insert($table, $data) {
        if ($this->con) {
            $fields = implode(',', array_keys($data));
            $binds = ':' . implode(',:', array_keys($data));
            $sql = "INSERT INTO $table ($fields) VALUES ($binds)";
            try {
                $stmt = $this->con->prepare($sql);
                $stmt->execute($data);
                return TRUE;
            } catch (PDOException $e) {
                $error = "QUERY FAILED=>" . $e->getMessage();
                $this->log($error, $sql, $data);
                return FALSE;
            }
        } else {
            return FALSE;
        }
    }

    public function delete($table, $where) {
        if ($this->con) {
            $sql = "DELETE FROM $table WHERE";
            foreach ($where as $key => $value) {
                $sql.=" $key = :$key AND";
            }
            $sql = substr($sql, 0, -3);
            try {
                $stmt = $this->con->prepare($sql);
                $stmt->execute($where);
                return TRUE;
            } catch (PDOException $e) {
                $error = "QUERY FAILED=>" . $e->getMessage();
                $this->log($error, $sql, $where);
                return FALSE;
            }
        }
        return FALSE;
    }

    public function update($table, $rows, $where) {
        if ($this->con) {
            $sql = "UPDATE $table SET ";
            foreach ($rows as $key => $value) {
                $sql.="$key = :$key,";
            }
            $sql = rtrim($sql, ',') . ' WHERE ';
            foreach ($where as $key => $value) {
                $sql.= "$key = :$key AND";
            }
            $sql = substr($sql, 0, -3);
            try {
                $stmt = $this->con->prepare($sql);
                $stmt->execute(array_merge($rows, $where));
                return TRUE;
            } catch (PDOException $e) {
                $error = "QUERY FAILED=>" . $e->getMessage();
                $this->log($error, $sql, $where);
                return FALSE;
            }
        }
        return FALSE;
    }

    public function count($table, $rows = '*', $where = null) {
        if ($this->con) {
            $sql = "SELECT COUNT($rows) FROM $table";
            if ($where) {
                $sql.=' WHERE ';
                foreach ($where as $key => $value) {
                    $sql.=" $key = '$value' AND";
                }
                $sql = substr($sql, 0, -3);
            }
            try {
                $result = $this->con->query($sql);
                return $result->fetchColumn();
            } catch (PDOException $e) {
                $error = "QUERY FAILED=>" . $e->getMessage();
                $this->log($error, $sql, $where);
                return -1;
            }
        }
        return -1;
    }

}
